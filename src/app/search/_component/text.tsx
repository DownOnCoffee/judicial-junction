'use client';
import { trpc } from '@/app/_trpc/client';
import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/divider';
import { Textarea } from '@nextui-org/input';
import { Spinner } from '@nextui-org/spinner';
import { useState } from 'react';

export default function SearchText() {
	const [input, setinput] = useState('');

	const mut = trpc.search.useMutation();

	const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (input !== '') mut.mutate({ query: input });
		setinput('');
	};

	return (
		<>
			<form onSubmit={HandleSubmit}>
				<Textarea
					minRows={1}
					color="primary"
					variant="bordered"
					className="w-full flex flex-col justify-center items-center h-full"
					size="lg"
					value={input}
					onValueChange={setinput}
					enterKeyHint="search"
				/>
				<Button
					variant="bordered"
					className=" mt-2"
					type="submit"
					color="secondary"
				>
					Search
				</Button>
			</form>
			<div className=" mt-10">
				{mut.isLoading && (
					<div className="">
						<Spinner size="lg" color="warning" />
					</div>
				)}
				{mut.isError ? (
					<div className="text-danger">
						An error occurred: {mut.error.message}
					</div>
				) : null}
				{mut.isSuccess &&
					mut.data.map((result, index) => (
						<div key={index} className="flex flex-col">
							{/* <div className="flex my-2 justify-center">
								<p className="mr-2 font-bold">
									Relevance Score 
								</p>
								
							</div>
							<p className="mr-2">{result._score}</p> */}
							<div className="flex my-2 justify-center">
								<p className="mr-2 font-bold">Relevant Cases</p>
							</div>

							<div className="flex my-2" key={index}>
								<p className="font-bold">{index + 1}.</p>
								<p className="">{result.fields.file_name[0]}</p>
							</div>

							<hr className="my-2 invisible" />
							<div className="flex my-2 justify-center">
								<p className="mr-2 font-bold">
									Summaries of Cases
								</p>
							</div>

							<div className="flex my-2" key={index}>
								<p className="font-bold">{index + 1}.</p>
								<p className="">
									{result.fields.file_summary[0]}
								</p>
							</div>

							<Divider className="my-4" />
						</div>
					))}
			</div>
		</>
	);
}