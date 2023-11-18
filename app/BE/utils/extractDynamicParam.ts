export const edp = ({ url }: { url: string }) => {
   return url.split("/")[url.split("/").length - 1]
}
