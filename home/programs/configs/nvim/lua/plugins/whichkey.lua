local M = {
  event = "VeryLazy",
  init = function()
    vim.o.timeout = true
    vim.o.timeoutlen = 300
  end,
  config = function()
    local conf = {
      plugins = {
        presets = {
          motions = true
        }
      },
    }

    local mappings = {
      ["f"] = { name = "+find" },
    }

    local opts = {

    }

    local wk = require("which-key")
    wk.setup(conf)
    wk.register(mappings, opts)
  end,
}

return M
