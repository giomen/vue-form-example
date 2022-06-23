export interface ComponentIconProps {
  icon: string,
  size?: IconSizeType,
  type?: IconType,
  iconPaths?: number,
}

export enum IconType {
  DANGER = 'danger',
  DEFAULT = 'default',
  LINK = 'link'
}

export enum IconSizeType {
  SMALL = 'small',
  MEDIUM = 'medium',
}
