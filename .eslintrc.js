module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    // '@vue/standard',
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    quotes: "off", // quotes (字符串 双引号)
    "space-before-function-paren": "off", // 函数前缺少空格
    "space-before-blocks": 0, //
    "space-infix-ops": 0, // 运算符“？”必须隔开
    semi: "off", // Extra semicolon (末尾分号)
    eqeqeq: "off", // 双等  三等
    "prefer-const": "off", // 使用const
    "comma-spacing": "off", // ','前需要空格
    "spaced-comment": "off", // 注释中“//”后应有空格或制表符
    "@typescript-eslint/ban-ts-comment": ["off"], // 不要使用“@ts ignore”，因为它会改变编译错误
    camelcase: [0, { properties: "always" }], // 没有使用驼峰命名法的报错解决
    "no-irregular-whitespace": "off", // 键间距值前缺少空格----不规则空格的报错
    "comma-dangle": "off",
    "key-spacing": 0,
    "@typescript-eslint/no-explicit-any": ["off"],
  },
};
