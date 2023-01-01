package main

import "testing"

func Test_add(t *testing.T) {
	type args struct {
		a int
		b int
	}

	type testCase struct {
		name string
		args args
		want int
	}

	tests := []testCase{
		{
			name: "can add two numbers",
			args: args{
				a: 2,
				b: 4,
			},
			want: 6,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := add(tt.args.a, tt.args.b); got != tt.want {
				t.Errorf("add() = %v, want %v", got, tt.want)
			}
		})
	}
}
