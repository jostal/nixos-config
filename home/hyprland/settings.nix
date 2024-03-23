{ config, ... }: {
	wayland.windowManager.hyprland.settings = {
		monitor = [
			"DVI-D-1, 1680x1050, 0x0, 1"
			"HDMI-A-1, 1920x1080, 1680x0, 1"
			"HDMI-A-2, 1920x1080, 3600x0, 1"
		];

		input = {
			kb_layout = "us";
			numlock_by_default = true;
			follow_mouse = 2;
			scroll_method = "on_button_down";
		};

		general = {
			gaps_in = 3;
			gaps_out = 3;
			border_size = 2;
			"col.active_border" = "rgba(ea6962ee) rgba(dc7570ee) 45deg";
			"col.inactive_border" = "rgba(595959aa)";
			layout = "dwindle";
			allow_tearing = false;
		};

		decoration = {
			rounding = 5;

			blur = {
				enabled = true;
				size = 5;
				passes = 3;
			};

      blurls = [
        # "bar0"
        # "bar1"
        # "bar2"
        "controlCenter"
        "calendar"
        "popupNotifications0"
        "popupNotifications1"
        "popupNotifications2"
        "appLauncher"
      ];

			drop_shadow = "yes";
			shadow_range = 4;
			shadow_render_power = 3;
			"col.shadow" = "rgba(1a1a1aee)";
		};

		animations = {
			enabled = "yes";
			bezier = "myBezier, 0.05, 0.9, 0.1, 1.05";
			animation = [
				"windows, 1, 7, myBezier"
				"windowsOut, 1, 7, default, popin 80%"
				"border, 1, 10, default"
				"borderangle, 1, 8, default"
				"fade, 1, 7, default"
				"workspaces, 1, 6, default"
			];
		};

		dwindle = {
			preserve_split = "yes";
		};

		gestures = {
			workspace_swipe = "off";
		};

		master = {
			new_is_master = true;
		};

		misc = {
			force_default_wallpaper = 0;
			disable_hyprland_logo = true;
      close_special_on_empty = true;
      enable_swallow = true;
      swallow_regex = "^(Alacritty)$";
		};
	};
}
