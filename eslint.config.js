module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        vars: 'all',            // Kiểm tra tất cả biến
        args: 'none',           // Không cảnh báo cho các tham số không dùng trong hàm
        ignoreRestSiblings: true, // Bỏ qua các biến không sử dụng trong phép gán rest (`...rest`)
      },
    ],
  },
}
