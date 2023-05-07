import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import TextInput from '../../atoms/TextInput.vue'

describe('TextInput', () => {
  it('renders properly', () => {
    const wrapper = mount(TextInput, { props: { label: 'Label', placeholder: 'Placeholder' } })
    expect(wrapper.text()).toContain('Label')
    expect(wrapper.get('input').attributes().placeholder).toContain('Placeholder')
  })

  it('renders a input number', () => {
    const wrapper = mount(TextInput, { props: { type: 'number' } })
    expect(wrapper.get('input').attributes().type).toContain('number')
  })

  it('renders a input with pattern', () => {
    const wrapper = mount(TextInput, { props: { pattern: '[0-9]' } })
    expect(wrapper.get('input').attributes().pattern).toContain('[0-9]')
  })

  it('renders a input with maxLength', () => {
    const wrapper = mount(TextInput, { props: { maxlength: '12' } })
    expect(wrapper.get('input').attributes().maxlength).toContain('12')
  })

  it('renders a input with a default value', () => {
    const wrapper = mount(TextInput, { props: { value: '12' } })
    expect(wrapper.get('input').element.value).toContain('12')
  })
})
