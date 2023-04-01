import type {
	AngleDoubleLeft,
	AngleDoubleRight,
	Arrow,
	ArrowDown,
	ArrowLeft,
	ArrowRight,
	ArrowUp,
	Asterisk,
	BezierCurve,
	Cancel,
	CaretDown,
	CaretUp,
	Check,
	Checked,
	Chevron,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	CircleFull,
	CircleOutline,
	Close,
	Code,
	ColorSwatches,
	Copy,
	Database,
	Deselect,
	DoubleUp,
	Edit,
	EditFilled,
	Email,
	Exclamation,
	ExclamationTriangle,
	Export,
	FastBackward,
	FastForward,
	Filter,
	FolderOpen,
	Fork,
	Gear,
	Globe,
	HalfStar,
	HandLizard,
	HandPointUp,
	Handshake,
	Hashtag,
	Help,
	Keyboard,
	Link,
	Menu,
	Minus,
	MinusSquare,
	Ok,
	Open,
	Palette,
	PaletteWithBrush,
	Pause,
	Pencil,
	Play,
	Plus,
	PlusSquare,
	ProjectDiagram,
	RemoveFilters,
	Reset,
	ReturnRight,
	Save,
	SelectAll,
	SelectNone,
	ShellPrompt,
	Sort,
	Star,
	StarOutline,
	StepBackward,
	StepForward,
	Trash,
	Unchecked,
} from '$lib/components/Icons/Basic';

import type { BASIC_ICON_NAMES } from '../../constants';

export type BasicIcon =
	| typeof AngleDoubleLeft
	| typeof AngleDoubleRight
	| typeof Arrow
	| typeof ArrowDown
	| typeof ArrowLeft
	| typeof ArrowRight
	| typeof ArrowUp
	| typeof Asterisk
	| typeof BezierCurve
	| typeof Cancel
	| typeof CaretDown
	| typeof CaretUp
	| typeof Check
	| typeof Checked
	| typeof Chevron
	| typeof ChevronLeft
	| typeof ChevronRight
	| typeof ChevronUp
	| typeof CircleFull
	| typeof CircleOutline
	| typeof Close
	| typeof Code
	| typeof ColorSwatches
	| typeof Copy
	| typeof Database
	| typeof Deselect
	| typeof DoubleUp
	| typeof Edit
	| typeof EditFilled
	| typeof Email
	| typeof Exclamation
	| typeof ExclamationTriangle
	| typeof Export
	| typeof FastBackward
	| typeof Filter
	| typeof FolderOpen
	| typeof Fork
	| typeof Gear
	| typeof Globe
	| typeof HalfStar
	| typeof HandLizard
	| typeof HandPointUp
	| typeof Handshake
	| typeof Hashtag
	| typeof Help
	| typeof Keyboard
	| typeof FastForward
	| typeof Link
	| typeof Menu
	| typeof Minus
	| typeof MinusSquare
	| typeof Ok
	| typeof Open
	| typeof Palette
	| typeof PaletteWithBrush
	| typeof Pause
	| typeof Pencil
	| typeof Play
	| typeof Plus
	| typeof PlusSquare
	| typeof ProjectDiagram
	| typeof RemoveFilters
	| typeof Reset
	| typeof ReturnRight
	| typeof Save
	| typeof SelectAll
	| typeof SelectNone
	| typeof ShellPrompt
	| typeof Sort
	| typeof Star
	| typeof StarOutline
	| typeof StepBackward
	| typeof StepForward
	| typeof Trash
	| typeof Unchecked;

export type BasicIconName = (typeof BASIC_ICON_NAMES)[number];
