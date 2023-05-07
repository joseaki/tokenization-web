import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PrimaryButton from '../../atoms/PrimaryButton.vue'

describe('PasswordInput', () => {
  it('renders properly', () => {
    const wrapper = mount(PrimaryButton, { props: {}, slots: { default: 'Button' } })
    expect(wrapper.text()).toContain('Button')
    expect(wrapper.attributes().disabled).not.toBeDefined()
  })

  it('renders a disabled button', () => {
    const wrapper = mount(PrimaryButton, {
      props: { disabled: true },
      slots: { default: 'Button' }
    })
    expect(wrapper.text()).toContain('Button')
    expect(wrapper.attributes().disabled).toBeDefined()
  })

  it('renders a loading button', () => {
    const wrapper = mount(PrimaryButton, {
      props: { loading: true },
      slots: { default: 'Button' }
    })
    expect(wrapper.text()).toContain('Button')
    expect(wrapper.get('svg').attributes().class).toMatch(/spin/)
  })

  it('renders a submit type button', () => {
    const wrapper = mount(PrimaryButton, {
      props: { type: 'submit' },
      slots: { default: 'Button' }
    })
    expect(wrapper.text()).toContain('Button')
    expect(wrapper.attributes().type).toContain('submit')
  })
})
