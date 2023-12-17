local utils = require("utils")

-- Toggle Term
vim.api.nvim_set_keymap('t', '<esc>', '<C-\\><C-n>', { noremap = true, silent = true })
vim.api.nvim_set_keymap('n', '<A-t>', "<cmd>TermSelect<cr>", { desc = "Focus selected terminal" })

-- mini.files
vim.api.nvim_set_keymap('n', 'n', '<cmd>lua MiniFiles.open()<cr>', { desc = "Open mini.files" })

-- Telescope
vim.api.nvim_set_keymap('n', 'ff', "<cmd>lua require('telescope.builtin').find_files()<cr>",
  { desc = "Search for files" })
vim.api.nvim_set_keymap('n', 'fg', "<cmd>lua require('telescope.builtin').live_grep()<cr>", { desc = "Search in files" })
vim.api.nvim_set_keymap('n', 'fb', "<cmd>lua require('telescope.builtin').buffers()<cr>", { desc = "Search for buffers" })
