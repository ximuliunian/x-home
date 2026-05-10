/**
 * 伪随机数生成器模块
 * 使用线性同余生成器（LCG）算法生成伪随机数
 */

/**
 * 线性同余生成器类
 * 使用公式: X_{n+1} = (a * X_n + c) mod m
 */
class LCG {
    private seed: number;  // 随机数种子

    /**
     * 构造函数
     * @param {number} [seed=Date.now()] - 种子值，默认为当前时间戳
     */
    constructor(seed = Date.now()) {
        this.seed = seed;
    }

    /**
     * 生成下一个随机数（0-1之间的浮点数）
     * @returns {number} - 0到1之间的随机浮点数
     */
    next(): number {
        const a = 1664525;  // 乘法因子
        const c = 1013904223; // 增量
        const m = 2 ** 32;   // 模数

        // 计算下一个种子值
        this.seed = (a * this.seed + c) % m;

        // 返回归一化的随机数（0到1之间的浮点数）
        return this.seed / m;
    }

    /**
     * 生成指定范围内的随机整数
     * @param {number} min - 最小值（包含）
     * @param {number} max - 最大值（包含）
     * @returns {number} - 指定范围内的随机整数
     */
    randomInt(min: number, max: number): number {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    /**
     * 生成指定范围内的随机浮点数
     * @param {number} min - 最小值（包含）
     * @param {number} max - 最大值（不包含）
     * @returns {number} - 指定范围内的随机浮点数
     */
    randomFloat(min: number, max: number): number {
        return this.next() * (max - min) + min;
    }
}

/**
 * 创建伪随机数生成器实例
 * @param {number} [seed] - 种子值（可选）
 * @returns {{ next: () => number, randomInt: (min: number, max: number) => number, randomFloat: (min: number, max: number) => number }}
 */
export default (seed?: number) => {
    const lcg = new LCG(seed);
    return {
        next: () => lcg.next(),
        randomInt: (min: number, max: number) => lcg.randomInt(min, max),
        randomFloat: (min: number, max: number) => lcg.randomFloat(min, max)
    }
}