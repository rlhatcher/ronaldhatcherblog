declare function initDimensions(config: {
  account: string
  viewers: string[]
  threeDViewer: {
    viewer: {
      autoShow: boolean
      showLoadingProgress: boolean
      controls: {
        enabled: boolean
        position: string
        zoom: boolean
        mouseZoom: boolean
        rotate: boolean
        pan: boolean
      }
      rotation: {
        enabled: boolean
        speed: number
        offOnInteraction: boolean
      }

      ar: {
        enabled: boolean
      }

      styles: {
        theme: string
      }
    }
  }
}): any
