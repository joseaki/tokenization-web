import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PasswordInput from '../../atoms/PasswordInput.vue'

describe('PasswordInput', () => {
  it('renders properly', () => {
    const wrapper = mount(PasswordInput, { props: { label: 'Label', placeholder: 'Placeholder' } })
    expect(wrapper.text()).toContain('Label')
    expect(wrapper.get('input').attributes().placeholder).toContain('Placeholder')
  })
})
