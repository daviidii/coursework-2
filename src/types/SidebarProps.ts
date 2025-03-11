import type { LucideProps } from 'lucide-vue-next'
import type { FunctionalComponent } from 'vue'

interface SubItemProp {
  title: string
  url: string
}

export interface SidebarProp {
  title: string
  icon?: FunctionalComponent<LucideProps, {}, any, {}>
  url: string
  isActive?: boolean
  subItems?: SubItemProp[]
}
