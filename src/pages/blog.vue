<template>
	<div class="vs-padding">
		<div class="blog-container">
			<div class="blog-content" v-if="!preview">
				<div
					v-for="(item, index) in blogList"
					:key="index"
					class="blog-list-container"
					@click="getContent(item)"
				>
					<p class="blog-title">
						{{ item.title }}
						<ElTag
							v-for="(tag, index) in item.tags"
							:key="index"
							:type="tag.type"
							class="my-tag"
							>{{ tag.name }}</ElTag
						>
					</p>
					<div class="main-box">
						<p class="blog-time info-text">
							Posted {{ item.time }}
						</p>
						<p class="blog-preview info-text">
							{{ item.preview }}...
						</p>
					</div>
				</div>
			</div>
			<Elsewhere @search="search"></Elsewhere>
		</div>
	</div>
</template>

<script lang="ts" setup>
import mdJson from "../../public/json/md.json";
import { ElTag } from "element-plus";
import { router } from "../router";
import Elsewhere from "../components/blog/elsewhere.vue";
import { ItagItem, IBlogItem } from "./page";
import { reactive, ref } from "vue";

const prop = defineProps<{
	preview?: boolean;
}>();

const preview = prop.preview || false;

let blogList = ref<IBlogItem[]>(mdJson as IBlogItem[]);

const getContent = async ({ filename }: IBlogItem) => {
	router.push({
		path: "/content",
		query: {
			filename: filename,
		},
	});
};

const search = (type: string) => {
	if (type === "none") {
		blogList.value = mdJson as IBlogItem[];
	} else {
		blogList.value = (mdJson as IBlogItem[]).filter(
			(el) => el.tags.filter((el) => el.name === type).length
		);
	}
};
</script>

<style lang="scss" scoped>
.vs-padding {
	padding-bottom: 20px;
}
.blog-container {
	width: calc(100% - 300px);
	min-height: calc(100vh - 240px);
	margin: 0 auto;
	border-radius: 20px;
	display: flex;
	// padding: 20px 0;

	:deep(.vuepress-markdown-body) {
		margin-left: 20px;
	}
	.blog-content {
		flex: 1;
		margin-right: 20px;
		.blog-list-container {
			@include circle-image;
			background-color: var(--background-blod);
			background-size: 10% 100%;
			background-repeat: no-repeat;
			margin-bottom: 20px;
			padding: 20px;
			height: 134px;
			cursor: pointer;
			.blog-title {
				font-size: 16px;
				white-space: pre-wrap;
				margin-bottom: 22px;
				.my-tag {
					vertical-align: bottom;
				}
			}
			.main-box {
				.blog-time {
					text-indent: 0;
					line-height: 32px;
				}
				.blog-preview {
					text-indent: 0;
					word-break: break-all;
				}
			}
		}
		.blog-list-container:hover .blog-title {
			@include hover-text;
		}
	}
}
</style>
