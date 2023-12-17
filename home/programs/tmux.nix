{ config, pkgs, ... }: {
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
    '';
  };
}
