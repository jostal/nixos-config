{ config, pkgs, ... }: 
let
  bg = "default";
  fg = "default";
  color = c: "#{@${c}}";

  indicator = rec {
    accent = color "indicator_color";
    content = "  ";
    module = "#[reverse,fg=${accent}]#{?client_prefix,${content},}";
  };

  current_window = rec {
    accent = color "main_accent";
    index = "#[reverse,fg=${accent},bg=${fg}] #I ";
    name = "#[fg=${bg},bg=${fg}] #W ";
    flags = "#{?window_flags,#{window_flags}, }";
    module =  "${index}${name}";
  };

  window_status = rec {
    accent = color "window_color";
    index = "#[reverse,fg=${accent},bg=${fg}] #I ";
    name = "#[fg=${bg},bg=${fg}] #W ";
    flags = "#{?window_flags,#{window_flags}, }";
    module =  "${index}${name}";
  };

  time = rec {
    accent = color "main_accent";
    format = "%H:%M";

    icon = pkgs.writeShellScriptBin "icon" ''
      hour=$(date +%H)
      if   [ "$hour" == "00" ] || [ "$hour" == "12" ]; then printf "󱑖"
      elif [ "$hour" == "01" ] || [ "$hour" == "13" ]; then printf "󱑋"
      elif [ "$hour" == "02" ] || [ "$hour" == "14" ]; then printf "󱑌"
      elif [ "$hour" == "03" ] || [ "$hour" == "15" ]; then printf "󱑍"
      elif [ "$hour" == "04" ] || [ "$hour" == "16" ]; then printf "󱑎"
      elif [ "$hour" == "05" ] || [ "$hour" == "17" ]; then printf "󱑏"
      elif [ "$hour" == "06" ] || [ "$hour" == "18" ]; then printf "󱑐"
      elif [ "$hour" == "07" ] || [ "$hour" == "19" ]; then printf "󱑑"
      elif [ "$hour" == "08" ] || [ "$hour" == "20" ]; then printf "󱑒"
      elif [ "$hour" == "09" ] || [ "$hour" == "21" ]; then printf "󱑓"
      elif [ "$hour" == "10" ] || [ "$hour" == "22" ]; then printf "󱑔"
      elif [ "$hour" == "11" ] || [ "$hour" == "23" ]; then printf "󱑕"
      fi
    '' + "/bin/icon";

    module = "#[fg=${fg}] ${format} #[fg=${accent}]#(${icon}) ";
  };

  pwd = rec {
    accent = color "main_accent";
    icon = "#[fg=${accent}] ";
    format = "#[fg=${fg}]#{b:pane_current_path}";
    module = "${icon}${format}";
  };
in {
  programs.tmux = {
    enable = true;
    shell = "${pkgs.fish}/bin/fish";
    terminal = "tmux-256color";
    historyLimit = 10000;
    prefix = "C-Space";
    escapeTime = 0;
    keyMode = "vi";
    mouse = true;
    plugins = with pkgs.tmuxPlugins; [
      vim-tmux-navigator
    ];
    extraConfig = ''
      # Copy mode
      bind v copy-mode
      bind -T copy-mode-vi v send-keys -X begin-selection
      bind-key -T copy-mode-vi C-v send-keys -X rectangle-toggle
      bind-key -T copy-mode-vi y send-keys -X copy-selection-and-cancel

      # Toggle status bar
      bind-key b set-option status

      # Split panes
      bind C-v split-window -h -c '#{pane_current_path}'
      bind C-h split-window -v -c '#{pane_current_path}'

      # Switch panes with vim awareness
      is_vim="ps -o state= -o comm= -t '#{pane_tty}' \
        | grep -iqE '^[^TXZ ]+ +(\\S+\\/)?g?(view|l?n?vim?x?|fzf)(diff)?$'"

      bind -n 'C-Left' if-shell "$is_vim" 'send-keys C-Left' 'select-pane -L'
      bind -n 'C-Right' if-shell "$is_vim" 'send-keys C-Right' 'select-pane -R'
      bind -n 'C-Up' if-shell "$is_vim" 'send-keys C-Up' 'select-pane -U'
      bind -n 'C-Down' if-shell "$is_vim" 'send-keys C-Down' 'select-pane -D'

      # Theme
      set-option -g @indicator_color "SteelBlue1"
      set-option -g @main_accent "DarkOrange3"
      set-option -g @window_color "Magenta"
      set-option -g status-style "bg=${bg} fg=${fg}"
      set-option -g status-left "${indicator.module}"
      set-option -g status-right "${pwd.module} | ${time.module}"
      set-option -g window-status-current-format "${current_window.module}"
      set-option -g window-status-format "${window_status.module}"
    '';
  };
}
