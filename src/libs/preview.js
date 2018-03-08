import {appFrameTypes} from 'store/types'
import { mapActions } from 'vuex'
...mapActions({
  addTab: appFrameTypes.A.ADD_TAB
})

const openPreview = id => {
  this.addTab({id: 'knowledgePreview', params: this.klForm, name: this.klForm.klKnowledge.title})
}
