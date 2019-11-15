# Auth

## Amplify

### Global configuration

- First of all, you need to create an [AWS account](https://portal.aws.amazon.com/billing/signup?redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation)
and install the CLI:

```bash
yarn global add @aws-amplify/cli
```

- Configure **AWS Amplify** on your computer. It will create a user and bind it to your CLI:

```bash
amplify configure
```

### Project configuration

- Add **AWS Amplify** inside your project and initialize it:

```bash
yarn add aws-amplify
amplify init
```

- Add **Auth** to **AWS Amplify**:

```bash
amplify add auth
```

:::warning

#### Username Aliases

If you want to activate **Username Aliases**, in `amplify/backend/auth/GENERATED_NAME`:

- modify `parameters.json` to add your aliases:

```json
"aliasAttributes": [MY_ALIASES],
```

- modify `GENERATED_NAME-cloudformation-template.yml` and add:

```yml
Parameters:
  ...
  aliasAttributes:
    Type: CommaDelimitedList
Resources:
  ...
  UserPool:
    ...
    Properties:
      ...
      AliasAttributes: !Ref aliasAttributes
```

:::

Push **Auth** to your account:

```bash
amplify push
```
