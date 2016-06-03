module ApplicationHelper
  def auth_token
    html = "<input type=\"hidden\" name=\"authenticity_token\" "
    html += "value=\"#{form_authenticity_token}\">"

    html.html_safe
  end

  def child_comments_rec(parent_comment)
    return parent_comment.content if parent_comment.child_comments.nil?
    html = ""
    parent_comment.child_comments.each do |child_comment|
      html = "<ul>"

      html += "<li>#{link_to child_comment.content, post_comment_url(child_comment.post, child_comment)}"

      # html += "<% link_to \"#{child_comment.content}\", post_comment_url(child_comment.post, child_comment) %>".html_safe

      html += child_comments_rec(child_comment)
      html += "</li>"
      html += "</ul>"
    end
    html.html_safe
  end
end
