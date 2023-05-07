import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import IconButton from '../../atoms/IconButton.vue'

describe('IconButton', () => {
  it('renders properly', () => {
    const wrapper = mount(IconButton, { props: { disabled: false }, slots: { default: 'texto' } })
    expect(wrapper.text()).toContain('texto')
    expect(wrapper.attributes().disabled).not.toBeDefined()
  })
  it('renders disabled', () => {
    const wrapper = mount(IconButton, { props: { disabled: true }, slots: { default: 'texto' } })
    expect(wrapper.text()).toContain('texto')
    expect(wrapper.attributes().disabled).toBeDefined()
  })
  it('renders with an accent color', () => {
    const wrapper = mount(IconButton, {
      props: { disabled: true, color: 'ACCENT' },
      slots: { default: 'texto' }
    })
    expect(wrapper.text()).toContain('texto')
    expect(wrapper.attributes().class).toMatch(/accent/)
  })
})
