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
    	gnumake
    	cmake
    	keychain

		(catppuccin-gtk.override {
			accents = [ "maroon" ];
			size = "compact";
			tweaks = [ "rimless" "black" ];
			variant = "macchiato";
		})

		# Notifications
    	libnotify
		# swaynotificationcenter
		polkit-kde-agent

		# Networking
		nmap
		tcpdump
		bettercap

		# Sound
		pavucontrol
    	pulseaudio

		# Development
		libgcc

    	# Games
    	gamescope
		libsForQt5.dolphin
		pcmanfm
	];

	environment.variables.EDITOR = "nvim";

	# Define a user account
	users = {
		users.jostal = {
			isNormalUser = true;
			description = "Joseph Talon";
			extraGroups = [ "networkmanager" "wheel" ];
      openssh.authorizedKeys.keys = [
        "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILsIP8OdPlIN6jIgO6QUlDNnl4kocc1SfwOOQLUE6nQK josephtalon01@gmail.com"
      ];
		};
		defaultUserShell = pkgs.fish;
	};

	programs = {
    fish.enable = true;
    dconf.enable = true;
  };

	# programs.partition-manager.enable = true;

	fonts = {
    fontDir.enable = true;
		packages = with pkgs; [
			# icon fonts
			material-design-icons

			# normal fonts
			noto-fonts
			noto-fonts-cjk
			# noto-fonts-emoji

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
				# "Noto Color Emoji"
			];
			sansSerif = [
				"Noto Sans"
				# "Noto Color Emoji"
			];
			monospace = [ "JetBrainsMono Nerd Font Mono" ];
			emoji = [
				# "Noto Color Emoji"
			];
		};
	};
  security.sudo.extraConfig = "Defaults timestamp_timeout=30";
	console = {
		earlySetup = true;
		font = "koi8u_8x16";
	};

  nixpkgs.config.packageOverrides = pkgs: {
    steam = pkgs.steam.override {
      extraPkgs = pkgs: with pkgs; [
        xorg.libXcursor
        xorg.libXi
        xorg.libXinerama
        xorg.libXScrnSaver
        libpng
        libpulseaudio
        libvorbis
        stdenv.cc.cc.lib
        libkrb5
        keyutils
      ];
    };
  };

	programs = {
		steam = {
			enable = true;
			remotePlay.openFirewall = true;
			dedicatedServer.openFirewall = true;
      gamescopeSession.enable = true;
		};

    ssh = {
      startAgent = true;
    };
	};

	qt = {
		enable = true;
	};

	sound.enable = false;
	services = {
		# Network
		vnstat.enable = true;
    gvfs.enable = true;

    blueman.enable = true;
    flatpak.enable = true;

    openssh = {
      enable = true;
      settings = {
      };
      openFirewall = true;
    };

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
