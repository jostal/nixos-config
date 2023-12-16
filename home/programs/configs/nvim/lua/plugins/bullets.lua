local M = {
  "dkarter/bullets.vim",
  event = "BufReadPre",
  init = function()
    vim.g.bullets_enabled_file_types = {
      'markdown',
      'text'
    }
  end
}

return M
