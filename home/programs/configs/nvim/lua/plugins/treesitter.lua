vim.opt.runtimepath:append("~/.local/share/treesitter")
require("nvim-treesitter.configs").setup({
  auto_install = true,
  parser_install_dir = "$HOME/.local/share/treesitter",
  highlight = {
    enable = true,
    disable = function(lang, buf)
      local max_filesize = 100 * 1024 -- 100 KB
      local ok, stats = pcall(vim.loop.fs_stat, vim.api.nvim_buf_get_name(buf))
      if (ok and stats and stats.size > max_filesize) then
        return true
      end
    end,
  },
  autopairs = { enable = true },
  autotag = { enable = true },
  indent = { enable = true },
  refactor = {
    highlight_definitions = {
      enable = true,
      -- Set to false if you have an `updatetime` of ~100.
      clear_on_cursor_move = true,
    },
    highlight_current_scope = { enable = true },
  },
})
require("treesitter-context").setup({})
