// 伪随机数生成
export default (seed) => {
    const lcg = new LCG(seed)
    return {
        next: () => lcg.next(),
        randomInt: (min, max) => lcg.randomInt(min, max),
        randomFloat: (min, max) => lcg.randomFloat(min, max)
    }
}

class LCG {
    // 构造函数，接受一个可选的种子值，默认为当前时间戳
    constructor(seed = Date.now()) {
        this.seed = seed;
    }

    // 生成下一个随机数
    next() {
        const a = 1664525; // 乘法因子
        const c = 1013904223; // 增量
        const m = 2 ** 32; // 模数

        // 计算下一个种子值
        this.seed = (a * this.seed + c) % m;

        // 返回归一化的随机数（0到1之间的浮点数）
        return this.seed / m;
    }

    // 生成指定范围内的随机整数
    randomInt(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }

    // 生成指定范围内的随机浮点数
    randomFloat(min, max) {
        return this.next() * (max - min) + min;
    }
}