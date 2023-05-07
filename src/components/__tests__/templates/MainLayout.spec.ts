import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import MainLayout from '../../templates/MainLayout.vue'

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}))

describe('MainLayout', () => {
  it('renders properly', () => {
    const wrapper = mount(MainLayout, { slots: { default: 'test' } })
    expect(wrapper.text()).toContain('test')
  })

  it('logout', async () => {
    const removeItem = vi.spyOn(Storage.prototype, 'removeItem')
    const wrapper = mount(MainLayout, { slots: { default: 'test' } })
    await wrapper.find('button').trigger('click')
    expect(removeItem).toHaveBeenCalledTimes(1)
  })
})
