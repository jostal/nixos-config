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
		};
	};
}
