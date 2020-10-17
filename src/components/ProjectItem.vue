<template>
  <f-panel padding="0" elevation="low" class="project mb-4" :class="type">
    <div v-if="type === 'default'" @click="click" class="">
      <div class="top d-flex align-center mt-2 px-4 mb-2 ">
        <div class="avatar mt-0">
          <v-avatar><v-img :src="project.avatar_url" :size="48"/></v-avatar>
        </div>
        <div class="title ml-2">
          {{ project.name }}
        </div>
      </div>
      <div class="content body-2 text--secondary px-4 mb-4">
        {{ project.description }}
      </div>
      <div class="donation mb-4 px-4">
        <div class="meta body-2 d-flex align-center text--secondary">
          {{ "Received" }}
          <em>${{ parseFloat(project.total).toFixed(4) }}</em>
          {{ "from" }}
          <em>{{ project.donations || 0 }}</em>
          {{ "patrons" }}
        </div>
      </div>
    </div>
    <div v-else>
      <div class="top d-flex align-center mt-2 px-4 mb-2 ">
        <div class="avatar mt-0">
          <v-avatar><v-img :src="project.avatar_url" :size="48"/></v-avatar>
        </div>
        <div class="title ml-2">
          {{ project.name }}
        </div>
      </div>
      <div class="content body-2 text--secondary px-4 mb-2">
        {{ project.description }}
      </div>
      <div class="donation mb-2 px-4">
        <div class="meta body-2 d-flex align-center text--secondary">
          {{ "Received" }}
          <em>${{ parseFloat(project.total).toFixed(4) }}</em>
          {{ "from" }}
          <em>{{ project.donations || 0 }}</em>
          {{ "patrons" }}
        </div>
      </div>
      <v-divider />
      <div class="d-flex justify-space-between pa-4">
        <v-btn color="primary" rounded outlined depressed @click="gotoHistory"
          >History</v-btn
        >
        <v-spacer />
        <v-btn color="primary" rounded depressed @click="gotoDonation"
          >Donation</v-btn
        >
      </div>
    </div>
  </f-panel>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
class ProjectItem extends Vue {
  @Prop() project;
  @Prop({ default: "default" }) type;

  get createdAt() {
    if (this.project && this.project.createdAt) {
      return this.$dayjs(this.project.createdAt).format("YYYY.MM.DD");
    }
    return "-";
  }

  click() {
    if (this.type === "default") {
      this.$emit("click", this.project);
    }
  }

  gotoHistory() {
    this.$router.push({
      name: "projects-id-history",
      params: { id: this.project.id },
    });
  }

  gotoDonation() {
    this.$router.push({
      name: "projects-id-donate",
      params: { id: this.project.id },
    });
  }
}
export default ProjectItem;
</script>

<style lang="scss">
.project {
  .title {
    text-transform: capitalize;
  }
  .donation {
    em {
      color: var(--v-primary-base);
      margin: 0 4px;
      font-weight: bold;
    }
  }
}
</style>
