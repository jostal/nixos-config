let
	binding = mod: cmd: key: arg: "${mod}, ${key}, ${cmd}, ${arg}";
	mainMod = "SUPER";
	# Commands
	moveFocus = binding mainMod "movefocus";
	resizeActive = binding "${mainMod} CTRL" "resizeactive";
in [
	# Programs
	"${mainMod}, T, exec, alacritty -e tmux"
	"${mainMod}, E, exec, nautilus"
	"${mainMod}, SPACE, exec, tofi-drun --drun-launch=true"
	
	# Switch workspaces
	"${mainMod}, 1, workspace, 1"
	"${mainMod}, 2, workspace, 2"
	"${mainMod}, 3, workspace, 3"
	"${mainMod}, 4, workspace, 4"
	"${mainMod}, 5, workspace, 5"
	"${mainMod}, 6, workspace, 6"
	"${mainMod}, 7, workspace, 7"
	"${mainMod}, 8, workspace, 8"
	"${mainMod}, 9, workspace, 9"
	"${mainMod}, 0, workspace, 10"
	"${mainMod}, S, togglespecialworkspace, magic" # Scratchpad workspace

	# Move active window to workspace
	"${mainMod} SHIFT, 1, movetoworkspace, 1"
	"${mainMod} SHIFT, 2, movetoworkspace, 2"
	"${mainMod} SHIFT, 3, movetoworkspace, 3"
	"${mainMod} SHIFT, 4, movetoworkspace, 4"
	"${mainMod} SHIFT, 5, movetoworkspace, 5"
	"${mainMod} SHIFT, 6, movetoworkspace, 6"
	"${mainMod} SHIFT, 7, movetoworkspace, 7"
	"${mainMod} SHIFT, 8, movetoworkspace, 8"
	"${mainMod} SHIFT, 9, movetoworkspace, 9"
	"${mainMod} SHIFT, 0, movetoworkspace, 10"
	"${mainMod} SHIFT, S, movetoworkspace, special:magic" # Scratchpad workspace

	# Move focus
	(moveFocus "left" "l")
	(moveFocus "right" "r")
	(moveFocus "up" "u")
	(moveFocus "down" "d")

	# Resize windows
	(resizeActive "h" "-20 0")
	(resizeActive "l" "20 0")
	(resizeActive "j" "0 20")
	(resizeActive "k" "0 -20")

	# Misc. window
	"${mainMod}, C, killactive"
	"${mainMod}, F, togglefloating"
	"${mainMod}, J, togglesplit"
]
