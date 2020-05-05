import React from 'react'
import './styles.scss'
import TextButton from '../../../../../../components/TextButton/TextButton'
import TextField, { modifiers, types, variants } from '../../../../../../components/TextField/TextField'
import SelectField from '../../../../../../components/SelectField/SelectField'
import TextArea from '../../../../../../components/TextArea/TextArea'

function ItemForm(props) {
  const { item, onChange, categories, cancel, save } = props

  return (
    <div className="item-info">
      <div className="item-info__info-section">
        <TextField
          value={item.title}
          variant={variants.LIGHT}
          modifiers={[modifiers.FULLWIDTH, modifiers.MARGINTOP]}
          onChange={value => onChange('title', value)}
          label={'Nimi'}
        />
        <SelectField
          options={categories}
          value={item.categoryId}
          onChange={value => onChange('categoryId', value)}
          label={'Kategooria'}
        />
        <TextField
          value={item.price}
          type={types.PRICE}
          variant={variants.LIGHT}
          modifiers={[modifiers.FULLWIDTH, modifiers.MARGINTOP]}
          onChange={value => onChange('price', value)}
          label={'Hind'}
        />
        <TextArea
          value={item.description}
          onChange={value => onChange('description', value)}
          label={'Kirjeldus'}
        />
      </div>

      <div className="item-info__button-section">
        <TextButton onClick={cancel} isTransparent>
          Tühista
        </TextButton>

        <TextButton onClick={save}>
          Salvesta
        </TextButton>
      </div>
    </div>
  )
}

export default ItemForm
