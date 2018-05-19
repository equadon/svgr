import { JSXAttribute } from 'h2x-plugin-jsx'

const customText = (text, tags) => {
  const split = text.split('=')
  const attr = split[0]
  const value = split[1]
  const tagList = (tags === undefined) ? [] : tags.split(',')
  let props = null

  return (text) => ({
    visitor: {
      JSXElement: {
        enter(path) {
          if (path.node.name === 'svg') {
            props = new JSXAttribute()
            props.name = 'className'
            props.value = 'svg-anim-ctrl'
            path.node.name = 'g'
            path.node.attributes = [props]
          } else if (tagList.includes(path.node.name) && !path.node.attributes.some(a => a && a.name === attr)) {
            props = new JSXAttribute()
            props.name = attr
            props.value = value
            props.literal = true
            path.node.attributes.push(props)
            path.replace(path.node)
          }
        },
      },
    },
  })
}

export default customText
