import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

// 抽取的YAML加载方法 (可被其他插件调用)
export function loadYamlConfig(configPath= '../source/config.yml', baseDir = process.cwd()) {
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

        // 配置热更新
        configureServer(server) {
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

        resolveId(id) {
            if (id === virtualModuleId) {
                return resolvedVirtualModuleId;
            }
        },

        load(id) {
            if (id === resolvedVirtualModuleId) {
                // 使用抽取的方法加载配置
                const config = loadYamlConfig(configPath);
                return `export default ${JSON.stringify(config)}`;
            }
        }
    };
}