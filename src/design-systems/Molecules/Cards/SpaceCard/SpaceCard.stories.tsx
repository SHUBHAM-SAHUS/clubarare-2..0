import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SpaceCard as SpaceCardComponent } from '.'

import { is } from 'utils'

const MOCK_SPACE = {
  address: '0x597270588081ceeaf2aa9335e8c2eba9e9f809e7',
  avatar: 'https://d1gqvtt7oelrdv.cloudfront.net/profile/1681230308886_thumbnail_1681230308860__teddy_.png',
  name: 'Rsousa Normal',
  spaceImage: 'https://d1gqvtt7oelrdv.cloudfront.net/space/1685375315277_blob.JPG',
}

export default is<ComponentMeta<typeof SpaceCardComponent>>()({
  argTypes: {
    address: { control: 'text', defaultValue: MOCK_SPACE.address },
    avatar: { control: 'text', defaultValue: MOCK_SPACE.avatar },
    name: { control: 'text', defaultValue: MOCK_SPACE.name },
    spaceImage: { control: 'text', defaultValue: MOCK_SPACE.spaceImage },
  },
  component: SpaceCardComponent,
  title: 'Molecules/Cards/SpaceCard',
})

const Template: ComponentStory<typeof SpaceCardComponent> = (props = MOCK_SPACE) => (
  <div className="w-[300px]">
    <SpaceCardComponent {...props} />
  </div>
)

export const SpaceCard = Template.bind({})
SpaceCard.args = {}
