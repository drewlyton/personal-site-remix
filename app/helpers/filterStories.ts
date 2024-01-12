import { Post } from "~/data/types";

export function filterStories(
  storiesArray: Array<Post>,
  searchString: string
): Array<Post> {
  if (!storiesArray) return [];
  return storiesArray.filter((story): Boolean => {
    return (
      story.title.toLowerCase().includes(searchString.toLowerCase()) ||
      story.description.toLowerCase().includes(searchString.toLowerCase())
    );
  });
}
