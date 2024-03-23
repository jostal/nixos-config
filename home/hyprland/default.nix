{ config, pkgs, inputs, ... }: {
	imports = [
		./settings.nix
	];

	wayland.windowManager.hyprland = {
		enable = true;
		systemd.enable = true;
    # package = inputs.hyprland.packages.${pkgs.system}.hyprland;
		xwayland.enable = true;

		settings = {
			# Execs
			exec-once = import ./exec.nix;

			# Binds
			bind = import ./binds.nix;
			bindm = [
				# Move/resize windows
				"SUPER, mouse:273, resizewindow"
				"SUPER, mouse:272, movewindow"
			];

      windowrulev2 = [
        "stayfocused,title:^()$,class:^(steam)$"
        # "minsize 1 1, title:^()$,class:^(steam)$"
        "monitor 1, title:^()$,class:^(steam_app_\d+)$"
      ];

      layerrule = [
        "ignorealpha[0.97],controlCenter"
        "ignorealpha[0.97],appLauncher"
        "ignorealpha[0.97],calendar"
        "ignorealpha[0.97],popupNotifications0"
        "ignorealpha[0.97],popupNotifications1"
        "ignorealpha[0.97],popupNotifications2"
      ];
		};
	};
}
