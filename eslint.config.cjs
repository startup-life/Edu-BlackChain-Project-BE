// eslint.config.cjs
const { configs } = require('@eslint/js');
const globals = require('globals');
const prettier = require('eslint-config-prettier');

module.exports = [
    // 1) 기본 추천 설정
    configs.recommended,

    // 2) 사용자 설정
    {
        languageOptions: {
            ecmaVersion: 2021, // ES2021 문법 사용
            sourceType: 'script', // CommonJS(=require/module.exports) 환경
            globals: {
                ...globals.node // Node 전역 변수(__dirname, process 등)
            }
        },
        rules: {
            'no-console': 'off',
            'no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true // 나머지 변수 무시
                }
            ] // _ 접두사 무시
        }
    },

    // 3) Prettier 충돌 규칙 제거
    prettier
];
