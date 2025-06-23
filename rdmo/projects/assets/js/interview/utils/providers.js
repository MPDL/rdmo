

const gatherProviderWidgetProps = (widgetProps, optionsets) => {
  // Collect all widgetProps from all optionsets, common props will be overwritten
  const providerWidgetProps = optionsets.reduce((props, optionset) => {
    if (optionset.has_provider) {
      return {
        ...props,
        ...optionset.provider_widget_props
      }
    } else {
      return props
    }
  }, {})

  const textPropsMap = (k, v) => {
    const map = {
      placeholder_text: {key: 'placeholder', value: gettext(v)},
      noOptionsMessage_text: {key: 'noOptionsMessage', value: () => gettext(v)},
      loadingMessage_text: {key: 'loadingMessage', value: () => gettext(v)}
    }
    return map[k]
  }

  // Update all serializable widget props (all but functions) with values from optionset providers
  let updatedWidgetProps = {...widgetProps}
  for (const [k, v] of Object.entries(providerWidgetProps)) {
    if (updatedWidgetProps.hasOwnProperty(k)) {
      updatedWidgetProps[k] = v
    
    } else if (k.endsWith('_text')) {
      let {key, value} = textPropsMap(k, v)
      updatedWidgetProps[key] = value
    }
  }

  return updatedWidgetProps
}

export { gatherProviderWidgetProps }