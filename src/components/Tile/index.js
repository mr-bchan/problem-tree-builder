import React from 'react';
import { Add } from '@material-ui/icons';
import { Label as Tag, Rating } from 'semantic-ui-react';
import {
  Description,
  Header,
  Icon,
  IndicationLevel,
  Indicator,
  Label,
  Wrapper,
  ItemDetailWrapper
} from './style';

const Tile = ({ item, onSelect, disabled, type, onRate }) => (
  <Wrapper
    onClick={!item.selected && disabled ? () => {} : onSelect}
    type={item.selected ? type : ''}
    disabled={!item.selected && disabled}
  >
    <Icon type={item.selected ? type : ''}>{!item.selected && <Add />}</Icon>
    <div style={{ width: '100%', padding: '5px' }}>
      <Header>
        {item.isEdited && (
          <Tag
            content="Edited"
            size="mini"
            style={{
              marginRight: '4px',
              textTransform: 'uppercase',
              color: 'white',
              backgroundColor: 'gray',
              borderRadius: '25px'
            }}
          ></Tag>
        )}
        {item.text}
      </Header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <ItemDetailWrapper>
            <Label>Link</Label>
            <Description style={{ textTransform: 'none' }}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {item.link}
              </a>
            </Description>
          </ItemDetailWrapper>

          <ItemDetailWrapper>
            <Label>Source</Label>
            <Description>{item.source}</Description>
          </ItemDetailWrapper>

          <ItemDetailWrapper>
            <Label>Country</Label>
            <Description>{item.country}</Description>
          </ItemDetailWrapper>

          <ItemDetailWrapper>
            <Label>User Score</Label>
            <Rating
              icon="star"
              maxRating={5}
              defaultRating={item.stars}
              onRate={(event, data) => {
                onRate(data.rating, item.id);
                event.stopPropagation();
              }}
            />
          </ItemDetailWrapper>

          <ItemDetailWrapper>
            <Label>Date</Label>
            <Description>{item.pub_time}</Description>
          </ItemDetailWrapper>
        </div>

        <Indicator>
          <IndicationLevel level={Math.round(item.score) * 100} />
        </Indicator>
      </div>
    </div>
  </Wrapper>
);

export default Tile;
