init = function()
  vim.o.timeout = true
  vim.o.timeoutlen = 300
end
config = function()
  local conf = {
    plugins = {
      presets = {
        operators = true,
        motions = true
      },
      key_labels = {
        ["<M>"] = "A"
      }
    },
  }

  local mappings = {

  }

  local opts = {

  }

  local wk = require("which-key")
  wk.setup(conf)
  -- wk.register(mappings, opts)
end

config()
