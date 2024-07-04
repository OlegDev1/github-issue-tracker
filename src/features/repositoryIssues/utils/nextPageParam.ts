import { AxiosResponse } from "axios";

export default function nextPageParam(lastPage: AxiosResponse) {
  const link: string | undefined = lastPage.headers.link;
  if (!link) return;
  const page = link.match(/(?<=<)([\S]*)(?=>; rel="Next")/i);
  if (!page) return;
  const result = page[0].match(/page=(\d+)/);
  if (!result) return;
  return result[1];
}
