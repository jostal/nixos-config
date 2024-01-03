{ config, pkgs, ... }: {
	imports = [
		./settings.nix
	];

	wayland.windowManager.hyprland = {
		enable = true;
		systemd.enable = true;
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
        "minsize 11, title:^()$,class:^(steam)$"
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
