<template>
  <Card>
    <Row>
      <div class="codemirror">
        <Codemirror
          v-model="code"
          placeholder="Code goes here..."
          :style="{ height: '400px', background: 'white' }"
          :autofocus="true"
          :indent-with-tab="true"
          :extensions="extensions"
        />
      </div>
    </Row>
  </Card>
</template>

<script>
import { Card, Textarea } from '@arco-design/web-vue';
import { defineComponent } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { sql } from '@codemirror/lang-sql';

export default defineComponent({
  components: {
    Codemirror,
  },
  setup() {
    const code = ref(`console.log('Hello, world!')`);
    const extensions = [sql()];

    // Codemirror EditorView instance ref
    const view = shallowRef();
    const handleReady = payload => {
      view.value = payload.view;
    };

    // Status is available at all times via Codemirror EditorView
    const getCodemirrorStates = () => {
      const state = view.value.state;
      const ranges = state.selection.ranges;
      const selected = ranges.reduce((r, range) => r + range.to - range.from, 0);
      const cursor = ranges[0].anchor;
      const length = state.doc.length;
      const lines = state.doc.lines;
      // more state info ...
      // return ...
    };

    return {
      code,
      extensions,
      handleReady,
      log: console.log,
    };
  },
});
</script>
<style scoped lang="less">
.codemirror {
  font-family: Arial, monospace;
  font-size: 22px;
}
</style>
