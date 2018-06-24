export default class IsPartOfCellService {
  call (targetElement) {
    while (targetElement != null) {
      if (targetElement.getAttribute('inkscape:label') === 'cell-area') {
        return true
      }
      targetElement = targetElement.parentElement
    }
    return false
  }
}
