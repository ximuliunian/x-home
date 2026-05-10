import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export function loadYamlConfig(configPath = '../source/config.yml', baseDir = process.cwd()) {
    const fullPath = path.resolve(baseDir, configPath);
    if (!fs.existsSync(fullPath)) {
        throw new Error(`YAML配置文件不存在: ${fullPath}`);
    }
    const yamlContent = fs.readFileSync(fullPath, 'utf8');
    return yaml.load(yamlContent);
}

export default (configPath = '../source/config.yml') => {
    const virtualModuleId = 'virtual:yaml-config';
    const resolvedVirtualModuleId = '\0' + virtualModuleId;

    return {
        name: 'yaml-config-loader',

        configureServer(server: { watcher: { add: (arg0: string) => void; on: (arg0: string, arg1: (changedPath: string) => void) => void; }; ws: { send: (arg0: { type: string; path: string; }) => void; }; }) {
            const fullPath = path.resolve(process.cwd(), configPath);

            server.watcher.add(fullPath);
            server.watcher.on('change', (changedPath) => {
                if (path.resolve(changedPath) === fullPath) {
                    server.ws.send({
                        type: 'full-reload',
                        path: '*'
                    });
                }
            });
        },

        resolveId(id: string) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId;
            }
        },

        load(id: string) {
            if (id === resolvedVirtualModuleId) {
                const config = loadYamlConfig(configPath);
                return `export default ${JSON.stringify(config)}`;
            }
        }
    };
}