import store from "@/store/store";

export default function getMenuData() {
  return [
    {
      label: 'Settings header 1',
      items: [
        {
          disabled: false,
          title: 'This is a title',
          subtitle: '',
          actionLabel: store.getters.deviceLayoutIsSmall,
          type: 'switch'
        }
      ]
    }
  ]
}