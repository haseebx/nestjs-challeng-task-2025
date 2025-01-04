import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('welcome')
export class WelcomeProcessor {
  @Process('sendWelcomeMessage')
  async handleWelcomeMessage(job: Job) {
    console.log(`Processing welcome message for: ${job.data.email}`);
    
    // Simulate email sending or other logic here
    const message = `Welcome message sent to ${job.data.email}`;

    // Log the return value to the console
    console.log(message);

    // Optionally, return the message
    return message;
  }
}
