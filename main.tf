provider "aws" {
  region = "us-east-2"
}

resource "aws_codepipeline" "pipeline" {
  name     = "empowerment-labs-backend"
  role_arn = aws_iam_role.pipeline.arn

  artifact_store {
    location = "empowerment-labs-bucket"
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "SourceAction"
      category         = "Source"
      owner            = "AWS"
      provider         = "Github"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        RepositoryName = "empowerment-labs-backend"
      }
    }
  }

  stage {
    name = "Build"

    action {
      name            = "BuildAction"
      category        = "Build"
      owner           = "AWS"
      provider        = "CodeBuild"
      version         = "1"
      input_artifacts = ["source_output"]

      configuration = {
        ProjectName = "empowerment-labs-backend"
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name            = "DeployAction"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "CloudFormation"
      version         = "1"
      input_artifacts = ["source_output"]

      configuration = {
        StackName = "empowerment-labs-backend"
        ActionMode = "CREATE_UPDATE"
        Capabilities = "CAPABILITY_IAM"
        TemplatePath = "source_output::template.yml"
      }
    }
  }
}

resource "aws_iam_role" "pipeline" {
  name = "my-pipeline-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "codepipeline.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}
