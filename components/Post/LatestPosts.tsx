import {
  isPostADraft,
  isPostInTheFuture,
} from "helpers/checkOfDraftOrFuturePost";
import { PostDocumentWithoutBody } from "interfaces";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch } from "redux/typesHooks";

import { resetTags, setTags } from "../../redux/slices/selectedTags";
interface Props {
  latestPosts: PostDocumentWithoutBody[];
}

const LatestPosts = ({ latestPosts }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="related-posts">
      <h2>Latest posts</h2>
      {latestPosts.map((post) => (
        <div className="related-posts-block" key={post.title}>
          <Link href={post._sys.filename} className="image">
            <Image
              src={post.heroImage ?? "/post-images/draft.webp"}
              alt="blog post image"
              width="102"
              height="102"
              sizes="100vw"
              style={{
                filter:
                  isPostADraft(post) || isPostInTheFuture(post)
                    ? "grayscale(50%)"
                    : "none",

                objectFit: "cover",
              }}
            />
          </Link>
          <div className="inner">
            <Link href={post._sys.filename} className="name">
              {post.title}
            </Link>
            <div className="tags">
              {post.tags.map((tag) => (
                <Link
                  href="/"
                  key={tag}
                  onClick={() => dispatch(setTags([tag]))}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}

      <Link href="/" className="btn" onClick={() => dispatch(resetTags())}>
        See all posts
      </Link>
    </div>
  );
};

export default LatestPosts;
