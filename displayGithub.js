$(document).ready(function() {
  $.getJSON("https://api.github.com/orgs/city-of-helsinki/events?per_page=10", function(githubData) {
    console.log(githubData);
    var $li, $list, branch, event, eventDescription, eventUrl, i, len, template;
    $list = $("#commits ul");
    for (i = 0, len = githubData.length; i < len; i++) {
      event = githubData[i];
      switch (event.type) {
        case "PushEvent":
          eventUrl = event.repo.url;
          branch = event.payload.ref.replace("refs/heads/", "");
          eventDescription = " pushed to " + branch + " at ";
          break;
        case "IssueCommentEvent":
          eventUrl = event.payload.issue.html_url;
          eventDescription = " " + event.payload.action + " comment on issue #" + event.payload.issue.number + " at ";
          break;
        case "IssuesEvent":
          eventUrl = event.payload.issue.html_url;
          eventDescription = " " + event.payload.action + " issue #" + event.payload.issue.number + " at ";
          break;
        case "PullRequestEvent":
          eventUrl = event.payload.pull_request.html_url;
          eventDescription = " " + event.payload.action + " pull request #" + event.payload.pull_request.number + " at ";
          break;
        case "MemberEvent":
          eventUrl = event.payload.member.html_url;
          eventDescription = " " + event.payload.action + " " + event.payload.member.login + " to ";
          break;
        case "ForkEvent":
          eventUrl = event.payload.forkee.html_url;
          eventDescription = " created fork " + event.payload.forkee.full_name + " from ";
          break;
        case "WatchEvent":
          eventUrl = event.repo.url;
          eventDescription = " " + event.payload.action + " watching ";
          break;
        case "PullRequestReviewCommentEvent":
          eventUrl = event.payload.comment.html_url;
          eventDescription = " " + event.payload.action + " comment on pull request #" + event.payload.pull_request.number + " at ";
          break;
        case "CreateEvent":
          eventUrl = event.repo.url;
          eventDescription = " created " + event.payload.ref_type + " " + event.payload.ref + " at ";
          break;
        case "DeleteEvent":
          eventUrl = event.repo.url;
          eventDescription = " deleted " + event.payload.ref_type + " " + event.payload.ref + " at ";
          break;
        default:
          eventUrl = event.repo.url;
          eventDescription = " - " + event.type + " - ";
      }
      $li = $("<li class='commit-list__item' />");
      template = "<div class=\"commit-list__avatar\"><img src=\"" + event.actor.avatar_url + "&s=128\" alt=\"" + event.actor.login + "\"></div>\n<a href=\"" + eventUrl + "\">\n  <div class=\"commit-list__date\"><time datetime=\"" + event.created_at + "\"></time></div>\n  <div class=\"commit-list__description\">\n    <span class=\"commit-list__actor\">" + event.actor.login + "</span> " + eventDescription + " <span class=\"commit-list__repo\">" + event.repo.name + "</span>\n  </div>\n</a>";
      $li.append($($.trim(template)));
      console.log($li);
      $list.append($li);
    }
    $("time").timeago();
  });
});
