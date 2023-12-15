{ config, pkgs, lib, ... }: {
	
	# Timezone/locale
	time.timeZone = "America/Toronto";
	i18n.defaultLocale = "en_CA.UTF-8";

	nixpkgs.config.allowUnfree = true;

	# System packages
	environment.systemPackages = with pkgs; [
		git
		neovim
		wget
		curl
		zip
		unzip
		ripgrep
		usbutils
    tree
		bind
		glib
		catppuccin-sddm-corners

		# Notifications
		swaynotificationcenter
		polkit-kde-agent

		# Networking
		nmap
		tcpdump
		bettercap

		# Sound
		pavucontrol

		# Development
		libgcc
	];

	environment.variables.EDITOR = "nvim";

	# Define a user account
	users = {
		users.jostal = {
			isNormalUser = true;
			description = "Joseph Talon";
			extraGroups = [ "networkmanager" "wheel" ];
		};
		defaultUserShell = pkgs.fish;
	};

	programs = {
    fish.enable = true;
    dconf.enable = true;
  };

	# programs.partition-manager.enable = true;

	fonts = {
		packages = with pkgs; [
			# icon fonts
			material-design-icons

			# normal fonts
			noto-fonts
			noto-fonts-cjk
			noto-fonts-emoji

			fira
			fira-code
			fira-code-symbols

			# Nerd fonts
			(nerdfonts.override {
				fonts = [
					"JetBrainsMono"
          "FiraCode"
				];
			})
		];

		enableDefaultPackages = true;

		fontconfig.defaultFonts = {
			serif = [
				"Fira"
				"Noto Color Emoji"
			];
			sansSerif = [
				"Noto Sans"
				"Noto Color Emoji"
			];
			monospace = [ "JetBrainsMono Nerd Font" "Noto Color Emoji"];
			emoji = [
				"Noto Color Emoji"
			];
		};
	};

	console = {
		earlySetup = true;
		font = "koi8u_8x16";
	};

	programs = {
		steam = {
			enable = true;
			remotePlay.openFirewall = true;
			dedicatedServer.openFirewall = true;
		};
	};

	qt = {
		enable = true;
	};

	sound.enable = false;
	services = {
		# Network
		vnstat.enable = true;

		# keymap in X11
		xserver = {
			enable = true;
			layout = "us";
			xkbVariant = "";
			videoDrivers = [ "amdgpu" ];

			excludePackages = [
				pkgs.xterm
			];

			displayManager = {
				sddm = {
					enable = true;
					wayland.enable = true;

					sugarCandyNix = {
						enable = true;
						settings = {
							Background = lib.cleanSource ./assets/current.jpg;
							BlurRadius = 50;
							HeaderText = "";
							ScreenPadding = 15;
							BackgroundColor = "#282828";
							AccentColor = "#d8a657";
							MainColor = "#d4be98";
							FormPosition = "left";
							HaveFormBackground = true;
							OverrideLoginButtonTextColor = "#282828";
						};
					};
				};
				defaultSession = "hyprland";
			};
		};

		pipewire = {
			audio.enable = true;
			wireplumber.enable = true;
			enable = true;
			alsa.enable = true;
			alsa.support32Bit = true;
			pulse.enable = true;
		};
	};
}
