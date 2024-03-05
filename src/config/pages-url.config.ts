class DASHBOARD {
  private readonly root = '/chat'
  HOME = this.root
  PROFILE = `${this.root}/profile`
  AUTH = `/auth`
  CREATE_DIALOG = `${this.root}/createDialog`
}

export const DASHBOARD_PAGES = new DASHBOARD()
