export interface Installation {
  action: string;
  created: string;
  installation: {
    id: number;
    account: {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: boolean;
    };
    access_tokens_url: string;
    repositories_url: string;
    html_url: string;
    app_id: number;
    app_slug: string;
    target_id: number;
    target_type: string;
    permissions: {
      Object: {
        pages: string;
        checks: string;
        issues: string;
        actions: string;
        secrets: string;
        contents: string;
        metadata: string;
        packages: string;
        statuses: string;
        workflows: string;
        codespaces: string;
        deployments: string;
        discussions: string;
        environments: string;
        merge_queues: string;
        pull_requests: string;
        administration: string;
        security_events: string;
        repository_hooks: string;
        actions_variables: string;
        codespaces_secrets: string;
        dependabot_secrets: string;
        codespaces_metadata: string;
        repository_projects: string;
        vulnerability_alerts: string;
        repository_advisories: string;
        secret_scanning_alerts: string;
        codespaces_lifecycle_admin: string;
      };
    };
    events: string[];
    created_at: string;
    updated_at: string;
    single_file_name: null;
    has_multiple_single_files: boolean;
    single_file_paths: string[];
    suspended_by: null;
    suspended_at: null;
  };

  repositories: {
    Array: Array<{
      requester: null;
      sender: {
        Object: {
          login: string;
          id: number;
          node_id: string;
          avatar_url: string;
          gravatar_id: string;
          url: string;
          html_url: string;
          followers_url: string;
          following_url: string;
          gists_url: string;
          starred_url: string;
          subscriptions_url: string;
          organizations_url: string;
          repos_url: string;
          events_url: string;
          received_events_url: string;
          type: string;
          site_admin: boolean;
        };
        String: string;
      };
    }>;
    Array: number;
  };
}
