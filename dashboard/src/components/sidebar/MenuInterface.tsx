export interface ExpandedMenuProps{
    setExpanded?: React.Dispatch<React.SetStateAction<boolean>>
    expanded: boolean
}

export interface SidepanelProps{
    children: React.ReactNode
}